-- Migration: 004_fix_conversation_sessions_duplicates
-- Description: Removes duplicate conversation sessions and adds a unique constraint to prevent future duplicates.

-- 1. Remove duplicates, keeping only the most recent one (highest id or created_at)
-- We use a CTE to identify duplicates based on conversation_id
WITH duplicates AS (
  SELECT id,
         ROW_NUMBER() OVER (
           PARTITION BY conversation_id 
           ORDER BY created_at DESC, id DESC
         ) as rnum
  FROM conversation_sessions
)
DELETE FROM conversation_sessions
WHERE id IN (
  SELECT id FROM duplicates WHERE rnum > 1
);

-- 2. Add UNIQUE constraint to conversation_id
-- This will prevent any future race conditions from creating duplicates
ALTER TABLE conversation_sessions
ADD CONSTRAINT conversation_sessions_conversation_id_key UNIQUE (conversation_id);
