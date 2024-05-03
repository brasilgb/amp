function maskCep(value: string) {
    if (value) {
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{5})(\d)/, "$1-$2");
        return value;
    }
}

function maskPhone(value: string) {
    if (value) {
        if (value.length < 11) {
            value = value.replace(/\D/g, "");
            value = value.replace(/^(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
            return value;
        } else {
            value = value.replace(/\D/g, "");
            value = value.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
            return value;
        }
    }
}

function maskDate(value: string) {
    if (value) {
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
        return value;
    }
}

function maskInscEstadual(value: string) {
    if (value) {
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{3})(\d{7})/, "$1/$2");
        return value;
    }
}

function maskCpfCnpj(value: string) {
    if (value.length < 12) {
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        return value;
    } else {
        value = value.replace(/\D/g, "");
        value = value.replace(
            /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
            "$1.$2.$3/$4-$5",
        );
        return value;
    }
}

function maskCnpj(value: string) {
    if (value) {
        value = value.replace(/\D/g, "");
        value = value.replace(
            /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
            "$1.$2.$3/$4-$5",
        );
        return value;
    }
}

function unMask(value: string) {
    if (value) {
        value = value.replace(/\D/g, "");
        return value;
    }
}

export { maskCep, maskPhone, maskDate, maskCpfCnpj, maskCnpj, unMask, maskInscEstadual };
