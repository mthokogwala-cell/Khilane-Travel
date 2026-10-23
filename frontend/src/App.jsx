import { Plane, Building2, Car, Bus, Search... } from "lucide-react";
type Tab = "flights" | "stays" | "cars" | "buses";
const [activeTab, setActiveTab] = useState<Tab>("flights");
const [selected, setSelected] = useState<any>(null);
