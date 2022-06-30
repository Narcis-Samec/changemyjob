import { Types } from "mongoose"
import BaseDataPump, { IPump } from "./BaseDataPump"

export default class CSUPump extends BaseDataPump implements IPump {

    name: string
    pathToTable = "#tabData > tbody"
    rawData: any

    constructor(name: string, url: string){
        super(url)
        this.name = name;
    }

    async runPump() {
        this.rawData = await this.startPump(this.pathToTable)
        return this.parser()
    }

    parser(){

        let years = this.rawData[0]
        const salaries = this.rawData[4]

        //reParse year
        years = years.map((year: string) => {
            return year.substring(0,4)
        });

        const parsedData: Array<{year: number, salary: number}> = years.map((year, index) => {
            return { year: +year, salary: +salaries[index].replace(/\s/g, "") }
        })

        console.log(parsedData)

        return parsedData
    }



} 