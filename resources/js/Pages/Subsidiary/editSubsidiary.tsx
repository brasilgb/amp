import { AddButton, BackButton, SaveButton } from '@/Components/Buttons'
import { Card, CardBody, CardContainer, CardFooter, CardHeader, CardHeaderContent } from '@/Components/Card'
import { BreadCrumbTop, HeaderContent, TitleTop } from '@/Components/PageTop'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { maskCep, maskCpfCnpj, maskInscEstadual, maskPhone, unMask } from '@/Utils/mask'
import { Head, useForm } from '@inertiajs/react'
import { IoPeopleSharp } from 'react-icons/io5'

const EditSubsidiary = ({subsidiaries}: any) => {

  const { data, setData, patch, progress, processing, errors } = useForm({
    tenant_id: subsidiaries.tenant_id,
    subnumber: subsidiaries.subnumber,
    subname: subsidiaries.subname,
    address: subsidiaries.address,
    number: subsidiaries.number,
    cep: subsidiaries.cep,
    county: subsidiaries.county,
    state: subsidiaries.state,
    neighborhood: subsidiaries.neighborhood,
    cnpj: subsidiaries.cnpj,
    statereg: subsidiaries.statereg,
    telephone: subsidiaries.telephone,
    whatsapp: subsidiaries.whatsapp,
    observation: subsidiaries.observation,
  });

  function handleSubmit(e: any) {
    e.preventDefault();
    patch(route("subsidiaries.update", subsidiaries.id));
  }


  const getCep = (cep: string) => {
    const cleanCep = unMask(cep);
    fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
      .then((response) => response.json())
      .then((result) => {
        setData((data) => ({ ...data, state: result.uf }));
        setData((data) => ({ ...data, county: result.localidade }));
        setData((data) => ({ ...data, neighborhood: result.bairro }));
        setData((data) => ({ ...data, address: result.logradouro }));
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
                { url: "/subsidiaries", label: "Clientes" },
                { url: null, label: "Adicionar cliente" },
              ]}
            />
          </HeaderContent>
          <CardContainer>
            <CardHeader>
              <CardHeaderContent>
                <BackButton url={"/subsidiaries"} label={"Voltar"} />
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
                        htmlFor="subnumber"
                      >
                        Nº Filial
                      </label>
                      <input
                        id="subnumber"
                        type="text"
                        value={data.subnumber}
                        className="input-form"
                        disabled
                      />
                      {errors.subnumber && (
                        <div className="text-sm text-red-500">
                          {errors.subnumber}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col col-span-2">
                      <label
                        className="label-form"
                        htmlFor="subname"
                      >
                        Descrição
                      </label>
                      <input
                        id="subname"
                        type="text"
                        value={data.subname}
                        onChange={(e) =>
                          setData("subname", e.target.value)
                        }
                        className="input-form"
                      />
                      {errors.subname && (
                        <div className="text-sm text-red-500">
                          {errors.subname}
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
                        htmlFor="address"
                      >
                        Endereço
                      </label>
                      <input
                        id="address"
                        type="text"
                        value={data.address}
                        onChange={(e) =>
                          setData("address", e.target.value)
                        }
                        className="input-form"
                      />
                      {errors.address && (
                        <div className="text-red-500">
                          {errors.address}
                        </div>
                      )}
                    </div>


                  </div>

                  <div className="grid grid-cols-6 gap-4 mt-6">
                    <div className="flex flex-col">
                      <label
                        className="label-form"
                        htmlFor="number"
                      >
                        Número
                      </label>
                      <input
                        id="number"
                        type="text"
                        value={data.number}
                        onChange={(e) =>
                          setData("number", e.target.value)
                        }
                        className="input-form"
                      />
                      {errors.number && (
                        <div className="text-sm text-red-500">
                          {errors.number}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col col-span-2">
                      <label
                        className="label-form"
                        htmlFor="county"
                      >
                        Municipio
                      </label>
                      <input
                        id="county"
                        type="text"
                        value={data.county}
                        onChange={(e) =>
                          setData(
                            "county",
                            e.target.value,
                          )
                        }
                        className="input-form"
                      />
                      {errors.county && (
                        <div className="text-sm text-red-500">
                          {errors.county}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label
                        className="label-form"
                        htmlFor="state"
                      >
                        UF
                      </label>
                      <input
                        id="state"
                        type="text"
                        value={data.state}
                        onChange={(e) =>
                          setData("state", e.target.value)
                        }
                        className="input-form"
                      />
                      {errors.state && (
                        <div className="text-sm text-red-500">
                          {errors.state}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col col-span-2">
                      <label
                        className="label-form"
                        htmlFor="neighborhood"
                      >
                        Bairro
                      </label>
                      <input
                        id="neighborhood"
                        type="text"
                        value={data.neighborhood}
                        onChange={(e) =>
                          setData(
                            "neighborhood",
                            e.target.value,
                          )
                        }
                        className="input-form"
                      />
                      {errors.neighborhood && (
                        <div className="text-sm text-red-500">
                          {errors.neighborhood}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mt-6">
                    <div className="flex flex-col">
                      <label
                        className="label-form"
                        htmlFor="cpf"
                      >
                        CNPJ
                      </label>
                      <input
                        id="cpf"
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
                        htmlFor="statereg"
                      >
                        Inscrição
                      </label>
                      <input
                        id="statereg"
                        type="text"
                        value={maskInscEstadual(data.statereg)}
                        onChange={(e) =>
                          setData(
                            "statereg",
                            e.target.value,
                          )
                        }
                        className="input-form"
                        maxLength={10}
                      />
                      {errors.statereg && (
                        <div className="text-sm text-red-500">
                          {errors.statereg}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label
                        className="label-form"
                        htmlFor="telephone"
                      >
                        Telefone
                      </label>
                      <input
                        id="telephone"
                        type="text"
                        value={maskPhone(data.telephone)}
                        onChange={(e) =>
                          setData(
                            "telephone",
                            e.target.value,
                          )
                        }
                        className="input-form"
                        maxLength={15}
                      />
                      {errors.telephone && (
                        <div className="text-sm text-red-500">
                          {errors.telephone}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="label-form"
                        htmlFor="whatsapp"
                      >12345678
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
                        htmlFor="observation"
                      >
                        Observação
                      </label>
                      <textarea
                        id="observation"
                        value={data.observation}
                        onChange={(e) =>
                          setData("observation", e.target.value)
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

export default EditSubsidiary