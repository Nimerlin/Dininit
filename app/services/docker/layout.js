// layouts/docker-layout.js
import { Inter } from "next/font/google";
import styles from "../styles/Services.module.css";

// Apply Inter font globally
const inter = Inter({ subsets: ["latin"] });

export default function DockerLayout({ children }) {
  return (
    
    <div className={`${inter.className} ${styles.bodyBackground}`}>
      <main className="min-h-screen flex flex-col max-w-screen-xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:space-x-4 px-6 py-9">
          
          {/* Content Area */}
          <div className="flex-1 bg-[#23262b] py-9 px-6 rounded-3xl">
            <div className="content-area overflow-y-auto p-4 lg:p-10">
              {children} {/* This will render your Docker Page content */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
