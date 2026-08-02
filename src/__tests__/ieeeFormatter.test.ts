import { describe, it, expect } from 'vitest';
import { formatCitationToIeeeString, cleanIeeeTitle, toRomanNumeral } from '../utils/ieeeFormatter';
import { Citation } from '../types';

describe('IEEE Formatter Utilities', () => {
  describe('formatCitationToIeeeString', () => {
    it('formats Attention Is All You Need paper correctly into IEEE standard string', () => {
      const cit: Citation = {
        id: '1',
        chunkId: 'chunk-1',
        documentName: 'Attention_Is_All_You_Need.pdf',
        pageNumber: 3,
        snippet: 'Self-attention mechanism...',
        relevanceScore: 98,
        verified: true,
      };
      const formatted = formatCitationToIeeeString(cit);
      expect(formatted).toContain('A. Vaswani');
      expect(formatted).toContain('Attention is all you need');
      expect(formatted).toContain('NeurIPS 2017');
    });

    it('formats RAG paper correctly into IEEE standard string', () => {
      const cit: Citation = {
        id: '2',
        chunkId: 'chunk-2',
        documentName: 'Retrieval_Augmented_Generation_NLP.pdf',
        pageNumber: 2,
        snippet: 'RAG models combine parametric memory...',
        relevanceScore: 95,
        verified: true,
      };
      const formatted = formatCitationToIeeeString(cit);
      expect(formatted).toContain('P. Lewis');
      expect(formatted).toContain('Retrieval-augmented generation');
    });

    it('formats LoRA paper correctly into IEEE standard string', () => {
      const cit: Citation = {
        id: '3',
        chunkId: 'chunk-3',
        documentName: 'LoRA_Low_Rank_Adaptation.docx',
        pageNumber: 4,
        snippet: 'LoRA allows us to train dense layers...',
        relevanceScore: 92,
        verified: true,
      };
      const formatted = formatCitationToIeeeString(cit);
      expect(formatted).toContain('E. J. Hu');
      expect(formatted).toContain('LoRA: Low-rank adaptation');
    });

    it('handles generic unknown document names cleanly', () => {
      const cit: Citation = {
        id: '4',
        chunkId: 'chunk-4',
        documentName: 'Quantum_Computing_Overview.pdf',
        pageNumber: 12,
        snippet: 'Quantum speedup observed...',
        relevanceScore: 89,
        verified: true,
      };
      const formatted = formatCitationToIeeeString(cit);
      expect(formatted).toContain('Primary Research Literature');
      expect(formatted).toContain('Quantum Computing Overview');
      expect(formatted).toContain('p. 12');
    });
  });

  describe('cleanIeeeTitle', () => {
    it('strips markdown headers and bolding', () => {
      const raw = '### **Grounded AI Synthesis**';
      expect(cleanIeeeTitle(raw)).toBe('Grounded AI Synthesis');
    });

    it('provides fallback for empty input', () => {
      expect(cleanIeeeTitle('', 'LoRA Fine-Tuning')).toBe('Comparative Synthesis: LoRA Fine-Tuning');
    });
  });

  describe('toRomanNumeral', () => {
    it('converts numbers 1-10 to Roman numerals accurately', () => {
      expect(toRomanNumeral(1)).toBe('I');
      expect(toRomanNumeral(2)).toBe('II');
      expect(toRomanNumeral(4)).toBe('IV');
      expect(toRomanNumeral(5)).toBe('V');
      expect(toRomanNumeral(9)).toBe('IX');
      expect(toRomanNumeral(10)).toBe('X');
    });
  });
});
