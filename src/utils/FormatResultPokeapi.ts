export class FormatResultPokeapi {
    async execute(response: any) {
        return {
            species: response.species,
            images: response.sprites,
            stats: response.stats,
            types: response.types,
            weight: response.weight,
        };
    }
}
