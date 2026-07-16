interface JDInputProps {

  value: string;
  onChange: (value: string) => void;
}

function JDInput({ value, onChange }: JDInputProps) {
  return (
    <div className="w-full max-w-2xl">
      <label className="block text-2xl font-semibold mb-4">
        Job Description(Optional)
      </label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={10}
        placeholder="Paste the job description here (optional). Add one to receive an ATS match score."
        className="w-full rounded-xl border p-4 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default JDInput;