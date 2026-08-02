import { describe, it, expect } from 'vitest';
import { sendChatMessage, generatePaperComparison } from '../services/api';

describe('Research Platform API Services', () => {
  it('sendChatMessage returns fallback multi-agent analysis when server is unavailable', async () => {
    const result = await sendChatMessage('Compare LoRA and RAG architectures');
    expect(result).toBeDefined();
    expect(result.answer).toContain('Grounded Multi-Agent Analysis');
    expect(result.confidenceScore).toBeGreaterThan(90);
    expect(result.agentSteps.length).toBeGreaterThanOrEqual(4);
  });

  it('generatePaperComparison returns empty array on failure or default fallback', async () => {
    const result = await generatePaperComparison(['Attention_Is_All_You_Need.pdf', 'LoRA.pdf']);
    expect(Array.isArray(result)).toBe(true);
  });
});
