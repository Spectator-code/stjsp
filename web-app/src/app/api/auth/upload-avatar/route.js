import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

// Security Note (007): In a real prod environment (Vercel/AWS), this should upload to Supabase Storage or S3
// Since we don't have guaranteed access to an 'avatars' bucket, we securely save to the local public directory.
// We apply strict 007 validations: size limit, MIME type check, and random UUID filenames.

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
        },
      }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    // 007 Security: Check size limit (2MB)
    const MAX_SIZE = 2 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ success: false, error: "File exceeds 2MB limit" }, { status: 400 });
    }

    // 007 Security: Validate MIME type strictly
    const validMimes = ["image/jpeg", "image/png", "image/webp"];
    if (!validMimes.includes(file.type)) {
      return NextResponse.json({ success: false, error: "Invalid file type. Only JPG, PNG, WEBP allowed." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 007 Security: Magic Byte Validation (Basic)
    // JPEG starts with FF D8
    // PNG starts with 89 50 4E 47
    // WEBP starts with RIFF (52 49 46 46) and WEBP (57 45 42 50) at offset 8
    const hex = buffer.toString('hex', 0, 4).toUpperCase();
    let isRealImage = false;
    let ext = '';

    if (hex.startsWith('FFD8')) {
      isRealImage = true;
      ext = 'jpg';
    } else if (hex === '89504E47') {
      isRealImage = true;
      ext = 'png';
    } else if (hex === '52494646') {
      const webp = buffer.toString('hex', 8, 12).toUpperCase();
      if (webp === '57454250') {
        isRealImage = true;
        ext = 'webp';
      }
    }

    if (!isRealImage) {
      return NextResponse.json({ success: false, error: "File failed security magic-byte inspection." }, { status: 400 });
    }

    // 007 Security: Generate UUID to prevent path traversal and guessable filenames
    const filename = crypto.randomUUID() + '.' + ext;
    
    // Upload directly to Supabase Storage (Required for Vercel/Serverless)
    const { data: storageData, error: storageError } = await supabase
      .storage
      .from('avatars')
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false
      });

    if (storageError) {
      console.error("Supabase storage error:", storageError);
      return NextResponse.json({ 
        success: false, 
        error: "Storage upload failed. Have you created the 'avatars' bucket in Supabase and configured RLS?" 
      }, { status: 500 });
    }

    const { data: publicUrlData } = supabase
      .storage
      .from('avatars')
      .getPublicUrl(filename);
      
    const publicUrl = publicUrlData.publicUrl;

    // Update user metadata
    const { error: updateError } = await supabase.auth.updateUser({
      data: { avatar_url: publicUrl }
    });

    if (updateError) {
      return NextResponse.json({ success: false, error: updateError.message }, { status: 500 });
    }

    // Sync to profiles table so admins can see it
    await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', user.id);

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
