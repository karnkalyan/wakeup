import {
  Trophy,
  Building2,
  Clock,
  Truck,
  Gem,
  Handshake,
  ShieldCheck,
  HardHat,
  Target,
  Star,
  MapPin,
  Phone,
  Mail,
  Package,
  Gift,
  Check,
  CheckCircle2,
  AlertTriangle,
  Landmark,
  MessageCircle,
  LucideProps
} from "lucide-react";

type IconProps = LucideProps & {
  name?: string;
};

export function DynamicIcon({ name, ...props }: IconProps) {
  if (!name) return null;

  switch (name.toLowerCase()) {
    case "trophy":
    case "🏆":
      return <Trophy {...props} />;
    case "building":
    case "building2":
    case "🏢":
      return <Building2 {...props} />;
    case "clock":
    case "⏱️":
    case "⏱":
      return <Clock {...props} />;
    case "truck":
    case "🚚":
      return <Truck {...props} />;
    case "gem":
    case "diamond":
    case "💎":
      return <Gem {...props} />;
    case "handshake":
    case "trust":
    case "🤝":
      return <Handshake {...props} />;
    case "shield":
    case "shield-check":
    case "shieldcheck":
    case "🛡️":
    case "🛡":
      return <ShieldCheck {...props} />;
    case "hardhat":
    case "hard-hat":
    case "safety":
    case "🦺":
      return <HardHat {...props} />;
    case "target":
    case "commitment":
    case "🎯":
      return <Target {...props} />;
    case "star":
    case "⭐":
      return <Star {...props} />;
    case "mappin":
    case "pin":
    case "📍":
      return <MapPin {...props} />;
    case "phone":
    case "call":
    case "📞":
      return <Phone {...props} />;
    case "mail":
    case "email":
    case "✉️":
    case "✉":
      return <Mail {...props} />;
    case "package":
    case "box":
    case "📦":
      return <Package {...props} />;
    case "gift":
    case "🎁":
      return <Gift {...props} />;
    case "landmark":
    case "🏛️":
    case "🏛":
      return <Landmark {...props} />;
    case "message":
    case "chat":
    case "whatsapp":
    case "💬":
      return <MessageCircle {...props} />;
    case "check":
    case "✓":
      return <Check {...props} />;
    case "checkcircle":
    case "✔":
      return <CheckCircle2 {...props} />;
    case "alert":
    case "warning":
    case "⚠️":
    case "⚠":
      return <AlertTriangle {...props} />;
    default:
      return <CheckCircle2 {...props} />;
  }
}
