function digitsOnly(value: string) {
  return value.replace(/\D+/g, "");
}

export function normalizePhoneValue(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  const digits = digitsOnly(trimmed);

  if (digits.startsWith("263") && digits.length >= 12) {
    return `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 12)}`.trim();
  }

  if (digits.startsWith("0") && digits.length >= 10) {
    return `+263 ${digits.slice(1, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)}`.trim();
  }

  return trimmed;
}

export function toPhoneHref(value: string) {
  const normalized = normalizePhoneValue(value);
  return normalized.replace(/\s+/g, "");
}
