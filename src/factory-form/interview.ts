import { IForm, IInterview } from './interfaces'
import Form from './form'

// An interview is the H1 root that groups forms
export default class Interview implements IInterview {
    title = 'Untitled Interview'
    forms: IForm[] = []

    constructor() {
        this.forms = [new Form(), new Form()]
    }
}
