-- Create a function that automatically creates a user profile when a new auth user is created
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Only create profile if user metadata contains the required fields
  IF NEW.raw_user_meta_data ? 'first_name' AND NEW.raw_user_meta_data ? 'last_name' THEN
    INSERT INTO users (
      id,
      email,
      first_name,
      last_name,
      user_type
    )
    VALUES (
      NEW.id,
      NEW.email,
      NEW.raw_user_meta_data->>'first_name',
      NEW.raw_user_meta_data->>'last_name',
      COALESCE(NEW.raw_user_meta_data->>'user_type', 'guardian')
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger on auth.users table
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
