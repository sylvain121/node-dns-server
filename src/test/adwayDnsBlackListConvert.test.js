const {extractDnsName, removeLineStartWithHash, convertToDnsBlackList} = require('../adwayDnsBlackListConverter');

describe('#adAwayDnsBlackListConverter', function () {
    describe('extractDnsName', () => {
        it('Should extract line with tab seperator', () => {

            const data = "127.0.0.1\t005.free-counter.co.uk";
            const response = extractDnsName(data);
            expect(response).toEqual("005.free-counter.co.uk");
        });
        it('Should extract line with space separator', () => {
            const data = "127.0.0.1 101com.com";
            const response = extractDnsName(data);
            expect(response).toEqual("101com.com");
        });
    });
    describe('removeLineStartWithHash', () => {
        it('Should remove line with #', () => {
            const data = "# start date:    Thu, 16 Sep 1999 00:00:00";
            const response = removeLineStartWithHash(data);
            expect(response).toEqual(false);
        });
        it('Should keep not commented line', () => {
            const data = "127.0.0.1 101com.com";
            const response = removeLineStartWithHash(data);
            expect(response).toEqual(true);
        });
    });
    describe('convertToDnsBlackList', () => {
        const data = "# start date:    Thu, 16 Sep 1999 00:00:00\n" +
            "127.0.0.1 101com.com\n" +
            "127.0.0.1 101order.com\n"+
            "127.0.0.1\t005.free-counter.co.uk\n" +
            "127.0.0.1\t006.free-adult-counters.x-xtra.com";

        const response = convertToDnsBlackList(data);
        expect(response[0]).toEqual("101com.com");
        expect(response[1]).toEqual("101order.com");
        expect(response[2]).toEqual("005.free-counter.co.uk");
        expect(response[3]).toEqual("006.free-adult-counters.x-xtra.com");
    });
});
