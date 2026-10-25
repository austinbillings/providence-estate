import { Award, Broom, Calendar, Chat, Check, Document, Family, Home, MapPin, Shield, Sun } from "./icons";

/** Icons owners can pick in the Studio; keys match sanity/schemaTypes/objects.ts. */
const icons = {
  document: Document,
  family: Family,
  chat: Chat,
  home: Home,
  shield: Shield,
  award: Award,
  calendar: Calendar,
  mapPin: MapPin,
  sun: Sun,
  broom: Broom,
  check: Check,
};

export function ContentIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name as keyof typeof icons] ?? Check;
  return <Icon className={className} />;
}
