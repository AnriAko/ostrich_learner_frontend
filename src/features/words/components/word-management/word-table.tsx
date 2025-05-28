import { WordDto } from "../../dto/word.dto";

interface Props {
    words: WordDto[];
    onEdit: (word: WordDto) => void;
    onDelete: (id: string) => void;
}

export const WordTable = ({ words, onEdit, onDelete }: Props) => {
    return (
        <table className="w-full text-left">
            <thead>
                <tr>
                    <th>Source</th>
                    <th>Target</th>
                    <th>Languages</th>
                    <th>Memory</th>
                    <th>Repetition</th>
                    <th>Learned</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {words.map((word) => (
                    <tr key={word.id}>
                        <td>{word.origin}</td>
                        <td>{word.translation}</td>
                        <td>
                            {word.origin} → {word.translation}
                        </td>
                        <td>{word.memoryScore}</td>
                        <td>{word.dateForRepetition?.slice(0, 10) || "—"}</td>
                        <td>{word.learningDate?.slice(0, 10) || "—"}</td>
                        <td>
                            <button onClick={() => onEdit(word)}>Edit</button>
                            <button
                                onClick={() => onDelete(word.id.toString())}
                                className="text-red-500"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
