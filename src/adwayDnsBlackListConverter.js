function removeLineStartWithHash(line) {
    return !line.includes("#");
}

function extractDnsName(line) {
    const regexp = /\t|\s/;
    return line.split(regexp)[1];
}

function convertToDnsBlackList(httpResponse) {
    const inputData = httpResponse;
    const splitedLine = inputData.split('\n');
    return splitedLine
        .filter(removeLineStartWithHash)
        .map(extractDnsName);

}


module.exports = {
    extractDnsName,
    removeLineStartWithHash,
    convertToDnsBlackList
};


