import React, { useState } from "react";

const Vendas: React.FC = () => {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCliente, setEditingCliente] = useState(null);
  const [formData, setFormData] = useState<any>({});

  const totalSteps = 6;

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        [name]: [...(formData[name] || []), value],
      });
    } else {
      setFormData({
        ...formData,
        [name]: formData[name].filter((item: string) => item !== value),
      });
    }
  };

  const handleSubmit = () => {
    if (isEditMode && editingCliente !== null) {
      const updatedClientes = [...clientes];
      updatedClientes[editingCliente] = formData;
      setClientes(updatedClientes);
    } else {
      setClientes([...clientes, formData]);
    }

    setShowModal(false);
    setCurrentStep(1);
    setFormData({});
    setIsEditMode(false);
    setEditingCliente(null);
  };

  return (
    <div className="space-y-8">
      {/* Tabela de Clientes */}
      <section className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Clientes</h2>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
            onClick={() => {
              setShowModal(true);
              setCurrentStep(1);
              setIsEditMode(false);
              setFormData({});
            }}
          >
            Cadastrar Cliente
          </button>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-2">Nome Fantasia</th>
              <th className="border-b p-2">Responsável</th>
              <th className="border-b p-2">Telefone</th>
              <th className="border-b p-2">Sistema Atual</th>
              <th className="border-b p-2">Data da Venda</th>
              <th className="border-b p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente, index) => (
              <tr key={index}>
                <td className="border-b p-2">{cliente.nomeFantasia}</td>
                <td className="border-b p-2">{cliente.responsavel}</td>
                <td className="border-b p-2">{cliente.telefone}</td>
                <td className="border-b p-2">{cliente.sistemaAtual}</td>
                <td className="border-b p-2">{cliente.dataVenda}</td>
                <td className="border-b p-2 space-x-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => {
                      setEditingCliente(index);
                      setIsEditMode(true);
                      setShowModal(true);
                      setFormData(clientes[index]);
                      setCurrentStep(1);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() =>
                      setClientes(clientes.filter((_, i) => i !== index))
                    }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Modal com Wizard */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-3xl p-6 overflow-y-auto max-h-screen">
            {/* Indicador de Progresso */}
            <div className="flex items-center mb-6">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={`flex-1 h-2 rounded-full ${
                    index + 1 <= currentStep ? "bg-blue-600" : "bg-gray-300"
                  }`}
                ></div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {isEditMode ? "Editar Cliente" : "Cadastrar Cliente"} - Etapa{" "}
              {currentStep}
            </h2>

            {/* Etapa 1: Dados Pessoais */}
            {currentStep === 1 && (
              <div>
                <h3 className="text-lg font-bold mb-2">Dados Pessoais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Nome Completo
                    </label>
                    <input
                      name="nomeCompleto"
                      className="p-2 border rounded w-full"
                      value={formData.nomeCompleto || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      CPF
                    </label>
                    <input
                      name="cpf"
                      className="p-2 border rounded w-full"
                      value={formData.cpf || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Cidade
                    </label>
                    <input
                      name="cidade"
                      className="p-2 border rounded w-full"
                      value={formData.cidade || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Telefone
                    </label>
                    <input
                      name="telefone"
                      className="p-2 border rounded w-full"
                      value={formData.telefone || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Email
                    </label>
                    <input
                      name="email"
                      className="p-2 border rounded w-full"
                      value={formData.email || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Etapa 2: Dados da Empresa */}
            {currentStep === 2 && (
              <div>
                <h3 className="text-lg font-bold mb-2">Dados da Empresa</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      CNPJ
                    </label>
                    <input
                      name="cnpj"
                      className="p-2 border rounded w-full"
                      value={formData.cnpj || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Razão Social
                    </label>
                    <input
                      name="razaoSocial"
                      className="p-2 border rounded w-full"
                      value={formData.razaoSocial || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Nome Fantasia
                    </label>
                    <input
                      name="nomeFantasia"
                      className="p-2 border rounded w-full"
                      value={formData.nomeFantasia || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Regime
                    </label>
                    <input
                      name="regime"
                      className="p-2 border rounded w-full"
                      value={formData.regime || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Tipo de Negócio
                    </label>
                    <input
                      name="tipoNegocio"
                      className="p-2 border rounded w-full"
                      value={formData.tipoNegocio || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Responsável
                    </label>
                    <input
                      name="responsavel"
                      className="p-2 border rounded w-full"
                      value={formData.responsavel || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Etapa 3: Dados Contabilidade */}
            {currentStep === 3 && (
              <div>
                <h3 className="text-lg font-bold mb-2">Dados Contabilidade</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Contabilidade
                    </label>
                    <input
                      name="contabilidade"
                      className="p-2 border rounded w-full"
                      value={formData.contabilidade || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Contador
                    </label>
                    <input
                      name="contador"
                      className="p-2 border rounded w-full"
                      value={formData.contador || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Telefone do Contador
                    </label>
                    <input
                      name="telefoneContador"
                      className="p-2 border rounded w-full"
                      value={formData.telefoneContador || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Etapa 4: Informações Financeiras */}
            {currentStep === 4 && (
              <div>
                <h3 className="text-lg font-bold mb-2">
                  Informações Financeiras
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Data da Venda
                    </label>
                    <input
                      name="dataVenda"
                      type="date"
                      className="p-2 border rounded w-full"
                      value={formData.dataVenda || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Envio de Cobrança
                    </label>
                    <select
                      name="envioCobranca"
                      className="p-2 border rounded w-full"
                      value={formData.envioCobranca || ""}
                      onChange={handleChange}
                    >
                      <option value="">Selecione</option>
                      <option value="email">Email</option>
                      <option value="whatsapp">WhatsApp</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Etapa 5: Informações Técnicas */}
            {currentStep === 5 && (
              <div>
                <h3 className="text-lg font-bold mb-2">Informações Técnicas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Quantidade Servidor
                    </label>
                    <input
                      name="quantidadeServidor"
                      className="p-2 border rounded w-full"
                      value={formData.quantidadeServidor || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Quantidade Retaguarda
                    </label>
                    <input
                      name="quantidadeRetaguarda"
                      className="p-2 border rounded w-full"
                      value={formData.quantidadeRetaguarda || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Quantidade Caixas
                    </label>
                    <input
                      name="quantidadeCaixas"
                      className="p-2 border rounded w-full"
                      value={formData.quantidadeCaixas || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <h3 className="text-lg font-bold mt-6 mb-2">
                  Tratamento de Dados
                </h3>
                <div>
                  <select
                    name="tratamentoDados"
                    className="p-2 border rounded w-full"
                    value={formData.tratamentoDados || ""}
                    onChange={handleChange}
                  >
                    <option value="">Selecione</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </select>
                </div>
              </div>
            )}

            {/* Etapa 6: Módulos Adicionais */}
            {currentStep === 6 && (
              <div>
                <h3 className="text-lg font-bold mb-2">Módulos Adicionais</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    "PIX QRCODE",
                    "TEF",
                    "Imagem",
                    "Backup Nuvem",
                    "Dashboard",
                    "App Vendas",
                    "App Fiscal",
                    "Matriz/Filial",
                    "Cotação Online",
                    "Tabela Digital",
                    "Grazi IA",
                  ].map((modulo) => (
                    <label key={modulo} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="modulosAdicionais"
                        value={modulo}
                        onChange={handleCheckboxChange}
                      />
                      <span>{modulo}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Botões de Navegação */}
            <div className="mt-6 flex justify-between">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-4 py-2 bg-gray-600 text-white rounded shadow hover:bg-gray-700"
                >
                  Voltar
                </button>
              )}
              {currentStep < 6 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
                >
                  Próximo
                </button>
              )}
              {currentStep === 6 && (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
                >
                  Enviar
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded shadow hover:bg-gray-500 ml-2"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vendas;
