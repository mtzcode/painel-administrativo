import React from "react";
import Link from "next/link";
import {
  HomeIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Menu Lateral */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 text-center font-bold text-lg border-b border-gray-700">
          Painel GR7
        </div>
        <nav className="flex-1">
          <ul>
            <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer transition">
              <HomeIcon className="h-5 w-5 mr-3 text-gray-400" />
              <Link href="/" passHref>
                <span>Principal</span>
              </Link>
            </li>
            <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer transition">
              <ClipboardDocumentListIcon className="h-5 w-5 mr-3 text-gray-400" />
              <Link href="/vendas" passHref>
                <span>Vendas</span>
              </Link>
            </li>
            <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer transition">
              <UserGroupIcon className="h-5 w-5 mr-3 text-gray-400" />
              <Link href="/implantacao" passHref>
                <span>Implantação</span>
              </Link>
            </li>
            <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer transition">
              <ChartBarIcon className="h-5 w-5 mr-3 text-gray-400" />
              <Link href="/relatorios" passHref>
                <span>Relatórios</span>
              </Link>
            </li>
            <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer transition">
              <Cog6ToothIcon className="h-5 w-5 mr-3 text-gray-400" />
              <Link href="/configuracoes" passHref>
                <span>Configurações</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4 text-center text-xs text-gray-500">© 2025 GR7</div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 bg-gray-100 p-8">
        <div className="bg-white shadow rounded-lg p-6">{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;
