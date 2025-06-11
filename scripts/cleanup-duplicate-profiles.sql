-- Clean up duplicate profiles, keeping only the most recent one for each user
WITH ranked_profiles AS (
  SELECT 
    id,
    email,
    ROW_NUMBER() OVER (PARTITION BY id ORDER BY created_at DESC) as rn
  FROM users
),
duplicates_to_delete AS (
  SELECT id, email
  FROM ranked_profiles 
  WHERE rn > 1
)
DELETE FROM users 
WHERE (id, email) IN (
  SELECT id, email FROM duplicates_to_delete
);

-- Show remaining profiles count per user
SELECT 
  id,
  email,
  COUNT(*) as profile_count
FROM users 
GROUP BY id, email
HAVING COUNT(*) > 1;
