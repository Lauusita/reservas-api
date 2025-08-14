import { createClient } from '@supabase/supabase-js';

export class SupabaseClient {
  private readonly supabase = createClient(this.supabaseUrl, this.supabaseServiceRole);

  constructor(
    private readonly supabaseUrl: string = process.env.SUPABASE_URL,
    private readonly supabaseKey: string = process.env.SUPABASE_KEY,
    private readonly supabaseServiceRole: string = process.env.SUPABASE_SERVICE_ROLE
  ) {}

  async uploadFile(bucket: string, filePath: string, file: Buffer, fileType: string) {
    
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      throw new Error(`Error uploading file: ${error.message}`);
    }
    return data;
  }

  async getSignedUrl(bucket: string, filePath: string) {
    const { data } = await this.supabase.storage.from(bucket).createSignedUrl(filePath, 31536000);
    return data.signedUrl;
  } 
}
