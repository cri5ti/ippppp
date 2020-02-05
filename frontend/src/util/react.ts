
export function cls(...props: Array<string|boolean>) {
    return props.filter(i => !!i).join(' ');
}