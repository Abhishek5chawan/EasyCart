
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://fojjhwxhectzoharndea.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvampod3hoZWN0em9oYXJuZGVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3NTc0NzcsImV4cCI6MjA1NDMzMzQ3N30.4f6xGp5X2u4u_xhPEc5EXb2Ihk-GiBxHIx6dL4P_-XE";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
