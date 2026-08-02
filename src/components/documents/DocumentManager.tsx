import React, { useState } from 'react';
import { DocumentMetadata } from '../../types';
import {
  Upload,
  FileText,
  Search,
  Trash2,
  Edit2,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  Database,
  X,
  FileCode,
  FileCheck
} from 'lucide-react';

interface DocumentManagerProps {
  documents: DocumentMetadata[];
  onUpload: (files: FileList) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, newName: string) => void;
}

export const DocumentManager: React.FC<DocumentManagerProps> = ({
  documents,
  onUpload,
  onDelete,
  onRename
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<DocumentMetadata | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const filteredDocs = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.author?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files);
    }
  };

  const handleStartRename = (doc: DocumentMetadata) => {
    setEditingId(doc.id);
    setEditingName(doc.name);
  };

  const handleSaveRename = (id: string) => {
    if (editingName.trim()) {
      onRename(id, editingName.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">Document Manager</h1>
          <p className="text-xs text-slate-400 mt-1">
            Upload PDF, DOCX, TXT, and Markdown files to build your local FAISS vector knowledge base.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-2">
            <Database className="w-4 h-4 text-indigo-400" />
            <span>{documents.length} Total Documents</span>
          </span>
        </div>
      </div>

      {/* Upload Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`p-8 rounded-2xl border-2 border-dashed transition-all text-center space-y-3 relative cursor-pointer ${
          isDragging
            ? 'border-indigo-500 bg-indigo-500/10'
            : 'border-slate-800 hover:border-slate-700 bg-slate-900/60'
        }`}
      >
        <input
          type="file"
          multiple
          accept=".pdf,.docx,.txt,.md"
          onChange={handleFileInput}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />

        <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mx-auto">
          <Upload className="w-6 h-6" />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-bold text-white">
            Drag & Drop Research Papers or <span className="text-indigo-400 underline">Browse Files</span>
          </p>
          <p className="text-xs text-slate-400">
            Supports PDF, DOCX, TXT, and Markdown up to 50MB each. Automatic chunking & FAISS vectorization.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search documents by name, author, or keyword..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Document Table */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="p-4">Document Name</th>
                <th className="p-4">Author / Year</th>
                <th className="p-4">Format & Size</th>
                <th className="p-4">Vector Status</th>
                <th className="p-4">Chunks</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No documents match your search. Upload files above to get started.
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-900/60 transition-colors">
                    {/* Name */}
                    <td className="p-4 font-semibold text-white">
                      {editingId === doc.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            className="px-2 py-1 bg-slate-950 border border-indigo-500 rounded text-xs text-white"
                          />
                          <button
                            onClick={() => handleSaveRename(doc.id)}
                            className="px-2 py-1 bg-indigo-600 text-white rounded text-[10px] font-bold"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2.5">
                          <FileText className="w-4 h-4 text-indigo-400 shrink-0" />
                          <span>{doc.name}</span>
                        </div>
                      )}
                    </td>

                    {/* Author */}
                    <td className="p-4 text-slate-400">
                      {doc.author ? `${doc.author} (${doc.year || '2026'})` : 'Uploaded Document'}
                    </td>

                    {/* Size */}
                    <td className="p-4 font-mono text-[11px] text-slate-400">
                      <span className="uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[9px] mr-2">
                        {doc.type}
                      </span>
                      {(doc.size / (1024 * 1024)).toFixed(2)} MB
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      {doc.status === 'ready' ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold flex items-center gap-1.5 w-max">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Indexed in FAISS</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-semibold flex items-center gap-1.5 w-max">
                          <Clock className="w-3 h-3 animate-spin" />
                          <span>Chunking Vectors...</span>
                        </span>
                      )}
                    </td>

                    {/* Chunks */}
                    <td className="p-4 font-mono text-[11px] text-slate-300">
                      {doc.chunkCount} vector chunks
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedDoc(doc)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                          title="Preview Chunks"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleStartRename(doc)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                          title="Rename Document"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDelete(doc.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition-colors"
                          title="Delete Document"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Document Chunk Preview Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                <span className="font-bold text-white text-sm">{selectedDoc.name}</span>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto pr-1">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                <span className="text-[10px] font-bold uppercase text-indigo-400 block">Abstract / Summary</span>
                <p>{selectedDoc.abstract || 'Document parsed into vector embedding space.'}</p>
              </div>

              <span className="text-[10px] font-bold text-slate-400 uppercase block pt-2">Sample Extracted Chunks ({selectedDoc.chunkCount}):</span>

              {[1, 2, 3].map((chunkIdx) => (
                <div key={chunkIdx} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>Chunk #{chunkIdx} • Page {chunkIdx}</span>
                    <span className="text-emerald-400 font-semibold">Similarity Cosine 0.94</span>
                  </div>
                  <p className="italic text-slate-300">
                    "Self-attention mechanisms relate different positions of a single sequence in order to compute a representation of the sequence, reducing training overhead significantly."
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
