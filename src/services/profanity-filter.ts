// const Filter = require('bad-words');
import Filter from 'bad-words';

// From @cbmm42 on GitHub

class FilterHacked extends Filter {
    cleanHacked(string: string) {
        try {
            const joinMatch = (this as any).splitRegex.exec(string);
            const joinString = joinMatch?.[0] || '';
            return string
                .split((this as any).splitRegex)
                .map(word => {
                    return this.isProfane(word) ? this.replaceWord(word) : word;
                })
                .join(joinString);
        } catch (e) {
            return string;
        }
    }
}

const filter = new FilterHacked();
// const filter = new Filter();

export { filter };