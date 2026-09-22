"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Check, Image as ImageIcon, Loader2 } from "lucide-react";

interface PresetOption {
  label: string;
  val: string;
}

interface ImageUploadFieldProps {
  name: string;
  defaultValue?: string;
  label?: string;
  presetOptions?: PresetOption[];
}

export function ImageUploadField({
  name,
  defaultValue = "",
  label = "Upload Image",
  presetOptions = [],
}: ImageUploadFieldProps) {
  const [imageUrl, setImageUrl] = useState<string>(defaultValue);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"upload" | "preset">("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.ok && data.url) {
        setImageUrl(data.url);
      } else {
        setError(data.error || "Failed to upload image. Please try again.");
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected network error occurred.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  function handleClear() {
    setImageUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <div className="admin-upload-field" style={{ marginBottom: "16px" }}>
      {/* Hidden input to pass value into server action or form submit */}
      <input type="hidden" name={name} value={imageUrl} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
        <label style={{ fontSize: "12.5px", fontWeight: 700, color: "#0c233c" }}>
          {label}
        </label>
        {presetOptions.length > 0 && (
          <div style={{ display: "flex", gap: "8px", fontSize: "11.5px" }}>
            <button
              type="button"
              onClick={() => setMode("upload")}
              style={{
                background: "none",
                border: "none",
                padding: "2px 6px",
                cursor: "pointer",
                fontWeight: mode === "upload" ? 800 : 500,
                color: mode === "upload" ? "var(--orange)" : "#64748b",
                borderBottom: mode === "upload" ? "2px solid var(--orange)" : "none",
              }}
            >
              Upload New
            </button>
            <button
              type="button"
              onClick={() => setMode("preset")}
              style={{
                background: "none",
                border: "none",
                padding: "2px 6px",
                cursor: "pointer",
                fontWeight: mode === "preset" ? 800 : 500,
                color: mode === "preset" ? "var(--orange)" : "#64748b",
                borderBottom: mode === "preset" ? "2px solid var(--orange)" : "none",
              }}
            >
              Pick Existing Asset
            </button>
          </div>
        )}
      </div>

      {mode === "upload" ? (
        <div>
          {/* Hidden native input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp, image/gif"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id={`file-input-${name}`}
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: "2px dashed #cbd5e1",
              borderRadius: "10px",
              padding: "16px",
              textAlign: "center",
              cursor: isUploading ? "wait" : "pointer",
              background: isUploading ? "#f1f5f9" : "#ffffff",
              transition: "all 0.2s ease",
            }}
            className="upload-dropzone"
          >
            {isUploading ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "var(--navy)" }}>
                <Loader2 size={20} className="animate-spin" />
                <span style={{ fontSize: "13px", fontWeight: 700 }}>Uploading image to server...</span>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#fef0e6", color: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Upload size={18} />
                </div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#0c233c" }}>
                  Click to Browse &amp; Upload Image
                </div>
                <div style={{ fontSize: "11.5px", color: "#64748b" }}>
                  Supports PNG, JPG, JPEG, WEBP
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div style={{ marginBottom: "8px" }}>
          <select
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            style={{
              width: "100%",
              padding: "9px 12px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "13.5px",
            }}
          >
            <option value="">-- Select from Preset Assets --</option>
            {presetOptions.map((opt) => (
              <option key={opt.val} value={opt.val}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {error && (
        <div style={{ color: "#e11d48", fontSize: "12px", marginTop: "6px", fontWeight: 600 }}>
          {error}
        </div>
      )}

      {/* PREVIEW BOX */}
      {imageUrl && (
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 12px",
            background: "#f8fafc",
            borderRadius: "10px",
            border: "1px solid #e2eaf0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", overflow: "hidden" }}>
            <div style={{ position: "relative", width: "50px", height: "40px", borderRadius: "6px", overflow: "hidden", border: "1px solid #cbd5e1", flexShrink: 0 }}>
              <Image
                src={imageUrl}
                alt="Uploaded preview"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#0c233c", display: "block" }}>
                Selected Image
              </span>
              <span style={{ fontSize: "11px", color: "#64748b", display: "block", overflow: "hidden", textOverflow: "ellipsis" }}>
                {imageUrl}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClear}
            style={{
              background: "#fff1f2",
              border: "1px solid #fecdd3",
              color: "#e11d48",
              borderRadius: "6px",
              padding: "4px 8px",
              fontSize: "11px",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <X size={12} /> Clear
          </button>
        </div>
      )}
    </div>
  );
}
