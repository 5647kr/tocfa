import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gbsjttwoeqeidstgcgcv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdic2p0dHdvZXFlaWRzdGdjZ2N2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0MjQ2ODksImV4cCI6MjA2OTAwMDY4OX0.cHVO8VCWZIPrR8UbrCHV0UEbtkNxoyxDVhzpqHitEPo";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;