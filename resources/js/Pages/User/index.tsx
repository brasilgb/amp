import { AddButton, DeleteButton, EditButton, OrderButton } from "@/Components/Buttons"
import { Card, CardBody, CardContainer, CardFooter, CardHeader, CardHeaderContent } from "@/Components/Card"
import FlashMessage from "@/Components/FlashMessage"
import InputSearch from "@/Components/InputSearch"
import { BreadCrumbTop, HeaderContent, TitleTop } from "@/Components/PageTop"
import Pagination from "@/Components/Pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/Table"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { roleUserByValue } from "@/Utils/functions"
import { maskCnpj, maskInscEstadual } from "@/Utils/mask"
import { Head, usePage } from '@inertiajs/react'
import moment from "moment"
import React, { Fragment } from 'react'
import { IoPeopleSharp } from "react-icons/io5"

const User = ({ users }: any) => {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Usuários" />
            <main className='animate__animated animate__fadeIn p-6'>
                <Card>
                    <HeaderContent>
                        <TitleTop>
                            <IoPeopleSharp size={30} />
                            <span className="ml-2">Usuários</span>
                        </TitleTop>
                        <BreadCrumbTop links={[{ url: null, label: "Usuários" }]} />
                    </HeaderContent>
                    <CardContainer>
                        <CardHeader>
                            <CardHeaderContent>
                                <InputSearch
                                    placeholder={"Buscar por nome"}
                                    url={"users.index"}
                                />
                            </CardHeaderContent>
                            <CardHeaderContent>
                                <AddButton
                                    url={route('users.create')}
                                    label={"Usuário"}
                                />
                            </CardHeaderContent>
                        </CardHeader>
                        <FlashMessage message={'flash'} />
                        <CardBody>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>#</TableHead>
                                        <TableHead>Empresa</TableHead>
                                        <TableHead>Nome</TableHead>
                                        <TableHead>E-mail</TableHead>
                                        <TableHead>Papel</TableHead>
                                        <TableHead>Cadastro</TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.data.map((user: any) => (
                                        <Fragment key={user?.id}>
                                            <TableRow>
                                                <TableCell>{user?.id}</TableCell>
                                                <TableCell>
                                                    {user?.tenant?.name}
                                                </TableCell>
                                                <TableCell>
                                                    {user?.name}
                                                </TableCell>
                                                <TableCell>
                                                    {user?.email}
                                                </TableCell>
                                                <TableCell>
                                                    {roleUserByValue(user?.roles)}
                                                </TableCell>
                                                <TableCell>
                                                    {moment(
                                                        user?.created_at,
                                                    ).format("DD/MM/YYYY")}
                                                </TableCell>
                                                <TableCell className="flex items-center justify-end gap-2">
                                                    <EditButton
                                                        url={route(
                                                            "users.edit",
                                                            user?.id,
                                                        )}
                                                    />
                                                    <DeleteButton
                                                        url="users.destroy"
                                                        param={user?.id}
                                                        identify={`o user ${user?.name}`}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        </Fragment>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardBody>
                        <CardFooter>
                            <Pagination data={users} />
                        </CardFooter>
                    </CardContainer>
                </Card>
            </main>
        </AuthenticatedLayout >
    )
}

export default User