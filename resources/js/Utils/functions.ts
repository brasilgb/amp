const statusUserByValue = (value: any) => {
    switch (value) {
        case 1:
            return "Ativo";
        case 2:
            return "Inativo";
    }
};

const roleUserByValue = (value: any) => {
    switch (value) {
        case 1:
            return "Administrador";
        case 2:
            return "Usuário";
        case 3:
            return "Técnico";
    }
};

export {
    statusUserByValue,
    roleUserByValue,
};
