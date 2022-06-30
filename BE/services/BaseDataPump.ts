import rp from 'request-promise';
import { AnyNode, Cheerio, load } from 'cheerio';
import cheerioTableparser from "cheerio-tableparser"

interface IEAnyNode extends Cheerio<AnyNode> {
    parsetable: cheerioTableparser
}

export interface IPump  {
    runPump: (url: string) => Promise<any>
}

export default abstract class BaseDataPump {

    url: string

    constructor(url: string) {
        this.url = url
    }

    protected async startPump(pathToTable: string): Promise<any> {
        return rp(this.url)
            .then(function (html: string | AnyNode | AnyNode[] | Buffer) {
                //HANDLE SUCCES

                const $ = load(html)
                cheerioTableparser($);

                /**
                 * we need to recast type since {@link cheerio-tableparser} does not have typescript types impemented
                 */
                const table = $(pathToTable) as IEAnyNode
                return table.parsetable(true, true, true)

            })
            .catch((err: any) => {
                //HANDLE ERROR
                console.log(err)
                return
            });
    }
}