interface Login {
    NMecanografico: string;
    password: string;
}

interface Register {
    NMecanografico: string;
    email: string;
    password: string;
    licenciatura: number;
}

interface AnoLetivo {
    AnoLetivo: string;
}

interface Licenciatura{
    Nome_licenciatura: string,
    Enabled: string
}

interface Disciplina{
    NomeDisciplina: string,
    Docentes: string,
    Licenciatura: number
}


interface Assignment{
    Nome_assignment: string,
    Disciplina: number,
    DueDate: string
}