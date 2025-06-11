-- Create a function to handle user profile creation that bypasses RLS
CREATE OR REPLACE FUNCTION create_user_profile(profile_data jsonb)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER -- This allows the function to bypass RLS
AS $$
BEGIN
  INSERT INTO users (
    id,
    email,
    first_name,
    last_name,
    phone,
    user_type,
    lab_name,
    lab_license_number,
    lab_address
  )
  VALUES (
    (profile_data->>'id')::uuid,
    profile_data->>'email',
    profile_data->>'first_name',
    profile_data->>'last_name',
    profile_data->>'phone',
    profile_data->>'user_type',
    profile_data->>'lab_name',
    profile_data->>'lab_license_number',
    profile_data->>'lab_address'
  );
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION create_user_profile(jsonb) TO authenticated;
GRANT EXECUTE ON FUNCTION create_user_profile(jsonb) TO anon;
