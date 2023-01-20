export type TAbout = {
    description?: string;
    pros?: string[];
    process?: string;
}

export type TSections = {
    title: string,
    alias: string,
}[]

export type TClasses = {
    title: string;
    href: string;
    alias: string;
    btn: {
        text: string;
        href: string;
    };
    points: {
        title: string;
        content: (string | string[])[]
    }[];
}[]

export type TContacts = {
    title: string;
    icon: string;
    link: string;
}[]

export type TData = {
    about: TAbout;
    sections: TSections;
    classes: TClasses;
    contacts: TContacts;
}
