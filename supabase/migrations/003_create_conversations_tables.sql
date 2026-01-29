-- ============================================
-- Migration: 003_create_conversations_tables
-- Creates conversations, messages, and sessions tables
-- ============================================

-- Tabla conversations
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  visitor_id VARCHAR(100) NOT NULL,
  visitor_metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER conversations_updated_at
  BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Índices
CREATE INDEX IF NOT EXISTS idx_conversations_agent ON conversations(agent_id);
CREATE INDEX IF NOT EXISTS idx_conversations_visitor ON conversations(visitor_id);
CREATE INDEX IF NOT EXISTS idx_conversations_created ON conversations(created_at DESC);

-- RLS
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Cualquiera puede crear conversaciones (chat público)
CREATE POLICY "Anyone can create conversations"
  ON conversations FOR INSERT WITH CHECK (true);

-- Admins pueden ver todas las conversaciones
CREATE POLICY "Admins can view all conversations"
  ON conversations FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- Tabla messages
-- ============================================

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  tokens_used INTEGER,
  model_used VARCHAR(100),
  processing_time_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(conversation_id, created_at);

-- RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Cualquiera puede crear mensajes
CREATE POLICY "Anyone can create messages"
  ON messages FOR INSERT WITH CHECK (true);

-- Admins pueden ver todos los mensajes
CREATE POLICY "Admins can view all messages"
  ON messages FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- Tabla conversation_sessions
-- ============================================

CREATE TABLE IF NOT EXISTS conversation_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  first_message_at TIMESTAMPTZ NOT NULL,
  last_message_at TIMESTAMPTZ NOT NULL,
  message_count INTEGER NOT NULL DEFAULT 0,
  user_message_count INTEGER NOT NULL DEFAULT 0,
  assistant_message_count INTEGER NOT NULL DEFAULT 0,
  transcript TEXT,
  classification JSONB,
  classified_at TIMESTAMPTZ,
  classified_by_model VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_sessions_agent ON conversation_sessions(agent_id);
CREATE INDEX IF NOT EXISTS idx_sessions_conversation ON conversation_sessions(conversation_id);
CREATE INDEX IF NOT EXISTS idx_sessions_first_message ON conversation_sessions(first_message_at DESC);
CREATE INDEX IF NOT EXISTS idx_sessions_classification ON conversation_sessions USING GIN (classification)
  WHERE classification IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_sessions_unclassified ON conversation_sessions(agent_id)
  WHERE classification IS NULL;

-- RLS
ALTER TABLE conversation_sessions ENABLE ROW LEVEL SECURITY;

-- Admins pueden gestionar sesiones
CREATE POLICY "Admins can manage sessions"
  ON conversation_sessions FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
