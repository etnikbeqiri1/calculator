import {
    ActionIcon,
    Button,
    Center,
    Container,
    Loader,
    Paper,
    Table,
    TextInput,
    useMantineTheme
} from "@mantine/core";
import {IconCalculator} from "@tabler/icons-react";
import {useForm} from "@mantine/form";
import {useHistory} from "../../api/hooks/use-history";
import {useExpression} from "../../api/hooks/use-expresion";
import {useDeleteHistoryItem} from "../../api/hooks/use-delete-history-item";
import {useDeleteHistory} from "../../api/hooks/use-delete-history";

export default function Calculator(){
    const form = useForm({
        initialValues: {
            expr : '',
        },

        validate: {
            expr: (value) => /^((\()?\d+(\^\d+)?(\))?([\+\-\*\/\%](\()?\d+(\^\d+)?(\))?)*)$/.test(value) ? null : 'Invalid equation'
        },
    });
    const theme = useMantineTheme();
    const expressionMutation = useExpression();
    const {mutate: deleteUseHistoryItem, isLoading: isDeletingItem} = useDeleteHistoryItem();
    const {mutate: deleteHistory, isLoading: isDeletingAll} = useDeleteHistory();
    const {data: history, isLoading, isSuccess, isRefetching} = useHistory();

    const handleDeleteItem = (id: number) => {
        deleteUseHistoryItem(id);
    }

    const handleDelete = () => {
        deleteHistory();
    }

    return  <Container size={420} my={40}>
        <form onSubmit={form.onSubmit(async ({expr}) => {
            expressionMutation.mutate(expr);
        })}>
        <TextInput
            radius="xl"
            size="md"
            rightSection={
                <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled" type={"submit"}>
                        <IconCalculator size="1.1rem" stroke={1.5} />
                </ActionIcon>
            }
            placeholder="Write an equation"
            {...form.getInputProps('expr')}
            rightSectionWidth={42}
        />
        </form>
        <Paper radius="md" withBorder mt={4}>
            {isLoading ?<Center><Loader /></Center>  : null}
            {isSuccess ? <Table>
                <thead>
                <tr>
                    <th>Expression</th>
                    <th>Result</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    isRefetching ? <tr key={"loading"}>
                        <td>Loading...</td>
                        <td>Loading...</td>
                        <td><Button style={{
                            float: "right"
                        }}>Delete</Button></td>
                    </tr> : null
                }
                {history?.data.map((historyItem) => {
                    return <tr key={historyItem.id}>
                        <td>{historyItem.expr}</td>
                        <td>{historyItem.result}</td>
                        <td><Button disabled={isDeletingItem || isDeletingAll} style={{
                            float: "right"
                        }} onClick={()=> handleDeleteItem(historyItem.id) }>Delete</Button></td>
                    </tr>
                })}</tbody>
            </Table> : null}
            {isSuccess && history.data.length > 0 ? <Button color={"red"} fullWidth onClick={handleDelete}>
                Delete All
            </Button> : null}
        </Paper>
    </Container>
}