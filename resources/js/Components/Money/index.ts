export const MoneyptBR = (value: number) => {
    return Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(value)
}

export const ValuePercent = (value:number) => {
    return `${value * 100}%`;
}