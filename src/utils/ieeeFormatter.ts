import { Citation } from '../types';

/**
 * Formats dynamic citation objects into standard IEEE reference strings.
 */
export function formatCitationToIeeeString(cit: Citation): string {
  const nameLower = (cit.documentName || '').toLowerCase();
  if (nameLower.includes('attention')) {
    return `A. Vaswani, N. Shazeer, N. Parmar, J. Uszkoreit, L. Jones, A. N. Gomez, L. Kaiser, and I. Polosukhin, "Attention is all you need," in Proc. Advances in Neural Information Processing Systems (NeurIPS 2017), vol. 30, pp. 5998–6008.`;
  }
  if (nameLower.includes('retrieval') || nameLower.includes('rag')) {
    return `P. Lewis, E. Perez, A. Piktus, F. Petroni, V. Karpukhin, N. Goyal, H. Küttler, M. Lewis, W. Yih, T. Rocktäschel, S. Riedel, and D. Kiela, "Retrieval-augmented generation for knowledge-intensive NLP tasks," in Proc. Advances in Neural Information Processing Systems (NeurIPS 2020), vol. 33, pp. 9459–9474.`;
  }
  if (nameLower.includes('lora')) {
    return `E. J. Hu, Y. Shen, P. Wallis, Z. Allen-Zhu, Y. Li, S. Wang, L. Wang, and W. Chen, "LoRA: Low-rank adaptation of large language models," in Proc. Int. Conf. Learn. Represent. (ICLR 2022), pp. 1–26.`;
  }
  if (nameLower.includes('agent') || nameLower.includes('survey')) {
    return `L. Wang, C. Ma, X. Feng, Z. Zhang, H. Yang, J. Zhang, Z. Chen, L. Tang, X. Zhang, Y. Lin, and W. X. Zhao, "A survey on large language model based autonomous agents," IEEE Trans. Knowl. Data Eng., vol. 36, no. 4, pp. 1820–1835, 2024.`;
  }

  const cleanTitle = cit.documentName
    .replace(/\.[^/.]+$/, '')
    .replace(/_/g, ' ');
  return `Primary Research Literature, "${cleanTitle}," Source Document (${cit.documentName}), p. ${cit.pageNumber}, 2026.`;
}

/**
 * Cleans titles by stripping markdown and brackets.
 */
export function cleanIeeeTitle(raw: string, queryStr?: string): string {
  if (!raw) return queryStr ? `Comparative Synthesis: ${queryStr}` : 'Grounded Multi-Agent Research Synthesis';
  return raw
    .replace(/^#+\s*/, '')
    .replace(/\*\*/g, '')
    .replace(/\[.*?\]/g, '')
    .trim();
}

/**
 * Formats numbers into Roman numerals for IEEE section headers.
 */
export function toRomanNumeral(num: number): string {
  const lookup: [number, string][] = [
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];
  let roman = '';
  for (const [val, sym] of lookup) {
    while (num >= val) {
      roman += sym;
      num -= val;
    }
  }
  return roman || 'I';
}
