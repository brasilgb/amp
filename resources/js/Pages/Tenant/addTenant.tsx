import { AddButton, BackButton, SaveButton } from '@/Components/Buttons'
import { Card, CardBody, CardContainer, CardFooter, CardHeader, CardHeaderContent } from '@/Components/Card'
import { BreadCrumbTop, HeaderContent, TitleTop } from '@/Components/PageTop'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { maskCep, maskCpfCnpj, maskInscEstadual, maskPhone, unMask } from '@/Utils/mask'
import { Head, useForm } from '@inertiajs/react'
import { IoPeopleSharp } from 'react-icons/io5'

const AddCustomer = (tenant: any) => {

  const { data, setData, post, progress, processing, errors } = useForm({
    codigo: tenant.tenant ? tenant.tenant + 1 : 1,
    descricao: "",
    endereco: "",
    numero: "",
    cep: "",
    municipio: "",
    uf: "",
    bairro: "",
    cnpj: "",
    inscricao: "",
    telefone: "",
    whatsapp: "",
    obs: "",
  });

  function handleSubmit(e: any) {
    e.preventDefault();
    post(route("customers.store"));
  }


  const getCep = (cep: string) => {
    const cleanCep = unMask(cep);
    fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
      .then((response) => response.json())
      .then((result) => {
        setData((data) => ({ ...data, uf: result.uf }));
        setData((data) => ({ ...data, municipio: result.localidade }));
        setData((data) => ({ ...data, bairro: result.bairro }));
        setData((data) => ({ ...data, endereco: result.logradouro }));
      })
      .catch((error) => console.error(error));
  };

  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />
      <main className='animate__animated animate__fadeIn p-6'>
        <Card>
          <HeaderContent>
            <TitleTop>
              <IoPeopleSharp size={30} />
              <span className="ml-2">Clientes</span>
            </TitleTop>
            <BreadCrumbTop
              links={[
                { url: "/customers", label: "Clientes" },
                { url: null, label: "Adicionar cliente" },
              ]}
            />
          </HeaderContent>
          <CardContainer>
            <CardHeader>
              <CardHeaderContent>
                <BackButton url={"/customers"} label={"Voltar"} />
              </CardHeaderContent>
              <CardHeaderContent>
                <></>
              </CardHeaderContent>
            </CardHeader>
            <form onSubmit={handleSubmit} autoComplete="off">
              <CardBody className=" border-y border-gray-100">
                <div className="px-3 my-4">
                  <div className="grid md:grid-cols-6 gap-4">
                    <div className="flex flex-col">
                      <label
                        className="label-form"
                        htmlFor="codigo"
                      >
                        Código
                      </label>
                      <input
                        id="codigo"
                        type="text"
                        value={("00000" + (data.codigo)).slice(-8)}
                        className="input-form"
                        disabled
                      />
                    </div>

                    <div className="flex flex-col col-span-2">
                      <label
                        className="label-form"
                        htmlFor="descricao"
                      >
                        Descrição
                      </label>
                      <input
                        id="descricao"
                        type="text"
                        value={data.descricao}
                        onChange={(e) =>
                          setData("descricao", e.target.value)
                        }
                        className="input-form"
                      />
                      {errors.descricao && (
                        <div className="text-sm text-red-500">
                          {errors.descricao}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label
                        className="label-form"
                        htmlFor="cep"
                      >
                        CEP
                      </label>
                      <input
                        id="cep"
                        type="text"
                        value={maskCep(data.cep)}
                        onChange={(e) =>
                          setData("cep", e.target.value)
                        }
                        onBlur={(e) =>
                          getCep(e.target.value)
                        }
                        className="input-form"
                        maxLength={9}
                      />
                      {errors.cep && (
                        <div className="text-sm text-red-500">
                          {errors.cep}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col col-span-2">
                      <label
                        className="label-form"
                        htmlFor="endereco"
                      >
                        Endereço
                      </label>
                      <input
                        id="endereco"
                        type="text"
                        value={data.endereco}
                        onChange={(e) =>
                          setData("endereco", e.target.value)
                        }
                        className="input-form"
                      />
                      {errors.endereco && (
                        <div className="text-red-500">
                          {errors.endereco}
                        </div>
                      )}
                    </div>


                  </div>

                  <div className="grid grid-cols-6 gap-4 mt-6">
                    <div className="flex flex-col">
                      <label
                        className="label-form"
                        htmlFor="numero"
                      >
                        Número
                      </label>
                      <input
                        id="numero"
                        type="text"
                        value={data.numero}
                        onChange={(e) =>
                          setData("numero", e.target.value)
                        }
                        className="input-form"
                      />
                      {errors.numero && (
                        <div className="text-sm text-red-500">
                          {errors.numero}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col col-span-2">
                      <label
                        className="label-form"
                        htmlFor="municipio"
                      >
                        Municipio
                      </label>
                      <input
                        id="municipio"
                        type="text"
                        value={data.municipio}
                        onChange={(e) =>
                          setData(
                            "municipio",
                            e.target.value,
                          )
                        }
                        className="input-form"
                      />
                      {errors.municipio && (
                        <div className="text-sm text-red-500">
                          {errors.municipio}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label
                        className="label-form"
                        htmlFor="uf"
                      >
                        UF
                      </label>
                      <input
                        id="uf"
                        type="text"
                        value={data.uf}
                        onChange={(e) =>
                          setData("uf", e.target.value)
                        }
                        className="input-form"
                      />
                      {errors.uf && (
                        <div className="text-sm text-red-500">
                          {errors.uf}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col col-span-2">
                      <label
                        className="label-form"
                        htmlFor="bairro"
                      >
                        Bairro
                      </label>
                      <input
                        id="bairro"
                        type="text"
                        value={data.bairro}
                        onChange={(e) =>
                          setData(
                            "bairro",
                            e.target.value,
                          )
                        }
                        className="input-form"
                      />
                      {errors.bairro && (
                        <div className="text-sm text-red-500">
                          {errors.bairro}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mt-6">
                    <div className="flex flex-col">
                      <label
                        className="label-form"
                        htmlFor="cnpj"
                      >
                        CNPJ
                      </label>
                      <input
                        id="cnpj"
                        type="text"
                        value={maskCpfCnpj(data.cnpj)}
                        onChange={(e) =>
                          setData("cnpj", e.target.value)
                        }
                        className="input-form"
                        maxLength={18}
                      />
                      {errors.cnpj && (
                        <div className="text-sm text-red-500">
                          {errors.cnpj}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="label-form"
                        htmlFor="inscricao"
                      >
                        Inscrição
                      </label>
                      <input
                        id="inscricao"
                        type="text"
                        value={maskInscEstadual(data.inscricao)}
                        onChange={(e) =>
                          setData(
                            "inscricao",
                            e.target.value,
                          )
                        }
                        className="input-form"
                        maxLength={10}
                      />
                      {errors.inscricao && (
                        <div className="text-sm text-red-500">
                          {errors.inscricao}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label
                        className="label-form"
                        htmlFor="telefone"
                      >
                        Telefone
                      </label>
                      <input
                        id="telefone"
                        type="text"
                        value={maskPhone(data.telefone)}
                        onChange={(e) =>
                          setData(
                            "telefone",
                            e.target.value,
                          )
                        }
                        className="input-form"
                        maxLength={15}
                      />
                      {errors.telefone && (
                        <div className="text-sm text-red-500">
                          {errors.telefone}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="label-form"
                        htmlFor="whatsapp"
                      >
                        Whatsapp(Ex.: 5551985471163)
                      </label>
                      <input
                        id="whatsapp"
                        type="text"
                        value={data.whatsapp}
                        onChange={(e) =>
                          setData(
                            "whatsapp",
                            e.target.value,
                          )
                        }
                        className="input-form"
                        maxLength={13}
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex flex-col">
                      <label
                        className="label-form"
                        htmlFor="obs"
                      >
                        Observação
                      </label>
                      <textarea
                        id="obs"
                        value={data.obs}
                        onChange={(e) =>
                          setData("obs", e.target.value)
                        }
                        className="input-form"
                      />
                    </div>
                  </div>
                </div>
              </CardBody>
              <CardFooter>
                <SaveButton />
              </CardFooter>
            </form>
          </CardContainer>
        </Card>
      </main>
    </AuthenticatedLayout>
  )
}

export default AddCustomer