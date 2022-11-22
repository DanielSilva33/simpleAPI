export class FormatResultPokeapi {
    async execute(response: any) {
        const { species, sprites, stats, types, weight } = response;
        return {
            species,
            images: sprites,
            stats,
            types,
            weight,
        };
    }
}
