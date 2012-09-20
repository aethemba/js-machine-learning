$(function(){
    var Chromosome = function(code) {
        if (code) {
            this.code = code;
        }
        this.cost = 9999;
    };

    Chromosome.prototype.code = '';
    Chromosome.prototype.random = function(length) {
        while (length--) {
            this.code += String.fromCharCode(Math.floor(Math.random()*255));
        }
    };

    Chromosome.calcCost = function(compareTo) {
        var total = 0;
        for(i = 0; i < this.code.length; i++ ) {
            total += (this.code.charCodeAt(i) - compareTo.charCodeAt(i)) *
                            (this.code.charCodeAt(i) - compareTo.charCodeAt(i));
        }
        this.cost = total;
    }

    Chromosome.prototype.mate = function(chromosoom) {
        var pivot = Math.round(this.code.length / 2) - 1;

        var child1 = this.code.substr(0, pivot) + chromosome.code.substr(pivot);
        var child2 = this.code.substr(0, pivot) + this.code.substr(pivot);

        return [new Chromosome(child1), new Chromosome(child2) ];
    };

    Chromosome.prototype.mutate = function(chance) {
        if (Math.random() > chance )
            return;

        var index = Math.floor(Math.random()*this.code.length);
        var UpOrDown = Math.random()
    }

    var Population = function(goal, size) {
        this.members = [];
        this.goal = goal;
        this.generationNumber = 0;
        while (size--) {
            var chromosome = new Chromosome();
            chromosome.random(this.goal.length);
            this.members.push(chromosome);
        }
    };

    Population.prototype.sort = function() {
        this.members.sort(function(a,b) {
            return a.cost - b.cost;
        });
    };

    Population.prototype.generation = function() {
        for (var i=0; i<this.members.length; i++){
            this.members[i].calcCost(this.goal);
        }

        this.sort();
        this.display();

        var children = this.members[0].mate(this.members[1]);
        this.members.splice(this.members.length-2, 2, children[0], children[1]);

        for (var i = 0; i < this.members.length; i++ ){
            this.members[i].mutate(0.5);
            this.members[i].calcCost(this.goal);
            if (this.members[i].code == this.goal) {
                this.sort();
                this.display();
                return True;
            }
        }
        this.generationNumber++;
        var scope = this;
        setTimeout(function() {scope.generation();}, 20);
    };
    var population = new Population("Hello World!", 20);
    population.generation();
});
