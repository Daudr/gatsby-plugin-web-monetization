import { onPreRenderHTML } from '../src/gatsby-ssr';

describe("gatsby-plugin-ssr", () => {
    describe("onPreRenderHTML", () => {
      describe("in non production env", () => {
        test("does not set meta tag", () => {
          const getHeadComponents = jest.fn();
          const reporter = {
            warn: jest.fn()
          };
          onPreRenderHTML({ reporter, getHeadComponents });
          // expect(reporter.warn).toHaveBeenCalledTimes(1);
          expect(getHeadComponents).not.toHaveBeenCalled();
        });
      });
      describe("in production env", () => {
        let env;
        beforeAll(() => {
          env = process.env.NODE_ENV;
          process.env.NODE_ENV = `production`;
        });
        afterAll(() => {
          process.env.NODE_ENV = env;
        });
  
        const setup = options => {
          const getHeadComponents = jest.fn(() => []);
          const replaceHeadComponents = jest.fn();
          const reporter = {
            warn: jest.fn()
          };
          const pathname = 'http://www.example.com/excluded-path';
          options = Object.assign({}, options);
          onPreRenderHTML(
            { reporter, getHeadComponents, replaceHeadComponents, pathname },
            options
          );
          return {
            reporter,
            getHeadComponents,
            replaceHeadComponents,
            pathname
          };
        };

        it("doesn't set web monetization meta tag on excludedPaths", () => {
          const options = {
            paymentPointer: "abc",
            excludedPaths: ["exclude", "path"]
          };

          const { getHeadComponents, replaceHeadComponents } = setup(options);
          expect(getHeadComponents).toHaveBeenCalledTimes(0);
          expect(replaceHeadComponents).toHaveBeenCalledTimes(0);
        })
  
        it("doesn't set web monetization meta tag without paymentPointer", () => {
          const { reporter, getHeadComponents, replaceHeadComponents } = setup();
          // expect(reporter.warn).toHaveBeenCalledTimes(1);
          expect(getHeadComponents).toHaveBeenCalledTimes(0);
          expect(replaceHeadComponents).toHaveBeenCalledTimes(0);
        });
  
        it("set web monetization meta tag with paymentPointer", () => {
          const options = {
            paymentPointer: "abc"
          };
          const { reporter, getHeadComponents, replaceHeadComponents } = setup(
            options
          );
          // expect(reporter.warn).toHaveBeenCalledTimes(0);
          expect(getHeadComponents).toHaveBeenCalledTimes(1);
          expect(replaceHeadComponents).toHaveBeenCalledTimes(1);
        });
      });
    });
  });