import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";


const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700" ] });
const inter = Inter({ subsets: ["latin"] });

export { inter, poppins }