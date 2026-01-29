-- ============================================
-- Migration: 002_create_agents_table
-- Creates agents table for AI configuration
-- ============================================

CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  avatar_url TEXT,
  system_prompt TEXT NOT NULL,
  model_id VARCHAR(100) NOT NULL DEFAULT 'google/gemini-2.0-flash-001',
  temperature DECIMAL(2,1) DEFAULT 0.7,
  max_tokens INTEGER DEFAULT 500,
  classification_topics JSONB DEFAULT '["general", "soporte", "ventas", "otro"]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger para updated_at
CREATE TRIGGER agents_updated_at
  BEFORE UPDATE ON agents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

-- Solo admins pueden gestionar agentes
CREATE POLICY "Admins can manage agents"
  ON agents FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Todos pueden leer agentes activos (para el chat público)
CREATE POLICY "Anyone can read active agents"
  ON agents FOR SELECT USING (is_active = true);

-- Índices
CREATE INDEX IF NOT EXISTS idx_agents_active ON agents(is_active) WHERE is_active = true;

-- Insert un agente por defecto
INSERT INTO agents (name, system_prompt, model_id, is_active)
VALUES (
  'Blackbird AI',
  'Eres Blackbird AI, el asistente virtual de MMA Academy. Tu objetivo es ayudar a los visitantes con información sobre clases y disciplinas disponibles (MMA, Muay Thai, Jiu-Jitsu, Boxing), horarios de clases, precios y planes de membresía, visitas de prueba gratuitas, e información general del gimnasio. Sé amable, profesional y motivador. Responde en español de manera concisa.',
  'google/gemini-2.0-flash-001',
  true
) ON CONFLICT DO NOTHING;
