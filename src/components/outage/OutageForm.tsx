"use client";

import { useState } from "react";
import Button from "../ui/Button";

export interface OutageFormValues {
  title: string;
  description: string;
  severity: string;
  type: string;
  location: string;
}

export interface OutageFormProps {
  onSubmit?: (values: OutageFormValues) => void;
}

export default function OutageForm({ onSubmit }: OutageFormProps) {
  const [formData, setFormData] = useState<OutageFormValues>({
    title: "",
    description: "",
    severity: "minor",
    type: "power",
    location: "",
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ): void => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-text-secondary">
          Title
        </label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full rounded-lg border border-border bg-bg-elevated px-3 py-2 text-sm text-text-primary outline-none focus:border-electric-blue"
          placeholder="Brief outage title"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-text-secondary">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="resize-none rounded-lg border border-border bg-bg-elevated px-3 py-2 text-sm text-text-primary outline-none focus:border-electric-blue"
          placeholder="Describe the outage..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-text-secondary">
            Severity
          </label>
          <select
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-bg-elevated px-3 py-2 text-sm text-text-primary outline-none focus:border-electric-blue"
          >
            <option value="minor">Minor</option>
            <option value="major">Major</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text-secondary">
            Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-bg-elevated px-3 py-2 text-sm text-text-primary outline-none focus:border-electric-blue"
          >
            <option value="power">Power</option>
            <option value="internet">Internet</option>
            <option value="water">Water</option>
            <option value="gas">Gas</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Submit Report
      </Button>
    </form>
  );
}
