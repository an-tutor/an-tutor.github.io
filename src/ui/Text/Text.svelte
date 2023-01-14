<script lang="ts">
    type TStyle = {
        fontSize?: number;
        lineHeight?: number;
        textAlign?: string;
    }

    export let text: string;
    export let wrapperTag: "div" = null;
    export let style: TStyle = null;

    const changeCase = (str: string) => str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);

    const styleToStr = (st: TStyle) => {
        let str = '';
        Object.keys(st).forEach((key: string) => {
            if (!!st[key]) str += `${changeCase(key)}: ${st[key]}${typeof st[key] === 'string' ? '' : 'px'}; `
        })
        return str;
    } 

    const str = !!wrapperTag
        ? `<${wrapperTag} style="${styleToStr(style)}">${text}</${wrapperTag}>`
        : text;
</script>

{@html str}
