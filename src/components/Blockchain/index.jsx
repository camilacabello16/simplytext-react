import { useEffect, useState } from "react";
import { Blockchain } from "../../blockchain/blockchain";
import { ec } from "elliptic";
import { Button, Card, Col, Divider, Drawer, Form, Input, InputNumber, Row, Table, Typography } from "antd";

const BlockchainComponent = () => {
    const [blockchain, setBlockchain] = useState(new Blockchain());
    const [walletKeys, setWalletKeys] = useState([]);
    const [blockTransaction, setBlockTransaction] = useState([]);
    const [openCreate, setOpenCreate] = useState(false);
    const [openSetting, setOpenSetting] = useState(false);

    useEffect(() => {
        blockchain.difficulty = 1;
        // blockchain.minePendingTransactions('my-wallet-address');

        console.log(blockchain);

        generateWalletKeys();
    }, [])

    const generateWalletKeys = () => {
        const keyGen = new ec('secp256k1');
        const key = keyGen.genKeyPair();

        var keyArray = walletKeys;
        var keyItem = {
            keyObj: key,
            publicKey: key.getPublic('hex'),
            privateKey: key.getPrivate('hex')
        }
        keyArray.push(keyItem);
        setWalletKeys(keyArray);
    }

    const columns = [
        {
            title: '#',
            key: '#',
            render: (text, record, index) => <span>{index}</span>
        },
        {
            title: 'From',
            key: 'From',
            dataIndex: 'fromAddress'
        },
        {
            title: 'To',
            key: 'To',
            dataIndex: 'toAddress'
        },
        {
            title: 'Amount',
            key: 'Amount',
            dataIndex: 'amount'
        },
        {
            title: 'Valid?',
            key: 'Valid?',
        },
    ]

    return (
        <div>
            <Row>
                <Col span={12}>
                    Blockchain
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Button type="primary">Pending transactions</Button>
                    <Button type="primary" style={{ marginLeft: 10 }} onClick={() => setOpenSetting(true)}>Settings</Button>
                    <Button type="primary" style={{ marginLeft: 10 }} onClick={() => setOpenCreate(true)}>Create transaction</Button>
                </Col>
            </Row>
            <div
                style={{
                    display: 'flex',
                    marginTop: 16
                }}
            >
                {blockchain.chain.map((item, index) => {
                    return (
                        <Card
                            key={index}
                            title={"Block " + (index + 1)}
                            style={{
                                marginRight: 16,
                                width: 300
                            }}
                            onClick={() => setBlockTransaction(item.transactions)}
                        >
                            <div>
                                <Typography.Title level={5}>Hash</Typography.Title>
                                <Typography.Text
                                    ellipsis
                                >{item.hash}</Typography.Text>
                            </div>
                            <div>
                                <Typography.Title level={5}>Hash from previous block</Typography.Title>
                                <Typography.Text
                                    ellipsis
                                >{item.previousHash}</Typography.Text>
                            </div>
                            <Divider />
                            <div>
                                <Typography.Title level={5}>Nonce</Typography.Title>
                                <Typography.Text
                                    ellipsis
                                >{item.nonce}</Typography.Text>
                            </div>
                            <Divider />
                            <div>
                                <Typography.Title level={5}>Timestamp</Typography.Title>
                                <Typography.Text
                                    ellipsis
                                >{item.timestamp}</Typography.Text>
                            </div>
                        </Card>
                    );
                })}
            </div>
            <Typography.Title level={3}>Transaction inside block</Typography.Title>
            <Row>
                <Col span={24}>
                    <Table
                        columns={columns}
                        dataSource={blockTransaction}
                    />
                </Col>
            </Row>
            <Drawer
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                size="large"
                title="Create transaction"
            >
                <Form
                    layout="vertical"
                >
                    <Form.Item
                        label={"From address"}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={"To address"}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={"Amount"}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                </Form>
            </Drawer>
            <Drawer
                open={openSetting}
                onClose={() => setOpenSetting(false)}
                size="large"
                title="Setting"
            >
                <Form
                    layout="vertical"
                >
                    <Form.Item
                        label={"Difficulty"}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label={"Mining reward"}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    );
}

export default BlockchainComponent;