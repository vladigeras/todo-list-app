export class Task {

    constructor(id: Number, title: String, description: String, isImportant: Boolean, date: String) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.isImportant = isImportant;
        this.date = date;
    }
}