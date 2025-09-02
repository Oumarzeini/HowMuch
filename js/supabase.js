import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = "https://lwtabrejbqlvfigkeslw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3dGFicmVqYnFsdmZpZ2tlc2x3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1NDg1NjUsImV4cCI6MjA3MTEyNDU2NX0.BfkX0pPp_ysMC65ZsleTAjfG8jJmZ8okz0BSWjqHF3I";
export const supabase = createClient(supabaseUrl, supabaseKey);

// API KEYS
export const IP_INFO_API_KEY = "41a97148e4c615";
export const WEATHER_API_KEY = "8ea10ddc89e16d4bb4590528125ca073";
