const solver = require("javascript-lp-solver");
const _ = require('lodash');
const csv = require('csvtojson');

const csvFilePath = 'DK_test.csv'
const SALARY_CAP = 40000;
const EQUAL_PLAYER_COUNT = 8;
const POSITION = {
    QB: 'QB',
    WR: 'WR',
    RB: 'RB',
    TE: 'TE',
    DST: 'DST'
};

csv()
    .fromFile(csvFilePath)
    .then(jsonObj => {

        // 
        //  SET UP PROJECTIONS
        //
        const projections = jsonObj.map(x => {
            return {
                id: parseInt(x.LastName),
                displayName: x.Salary === 'DST' ? x.Position : `${x.Position} ${x.FirstName}`,
                salary: parseInt(x.Proj_Points),
                teamAbbreviation: x.field7,
                position: x.Salary,
                value: parseInt(x.Team)
            }
        });

        //
        //  SOLVE FOR OPTIMAL LINEUP
        //
        const result = optimizeLineup(projections, { includes: [], excludes: [] })
        console.log(result)
    })




const optimizeLineup = (projections, options) => {

    let { includes, excludes } = options;

    let draftKingProjections = setupProjections(projections, excludes);
    let model = setupModel(draftKingProjections, includes);
    let players = formatPlayersForOptimizeModel(draftKingProjections);

    addZeroOnePlayerConstraint(players);
    addBinaries(players, model);
    model.variables = players;

    //
    //  SOLVE MODEL
    //
    let results = solver.Solve(model);
    const keys = Object.keys(results);
    const lineup = getLineupResults(keys, players);

    const data = {};
    data.solverResults = results;
    data.lineupCost = _.reduce(lineup, totalSalary, 0);
    data.lineup = lineup;
    // data.draftables = players;
    // data.model = model;

    return data;

};

function getLineupResults(keys, players) {
    let lineup = [];
    for (let i in keys) {
        if (!isNaN(keys[i])) {
            lineup.push(players[keys[i]]);
        }
    }

    return lineup;
}

function setupModel(projections, includes) {
    let model = {
        optimize: 'value',
        opType: 'max',
        constraints: {
            salary: { max: SALARY_CAP },
            playerCount: { equal: EQUAL_PLAYER_COUNT },
            qb: { min: 1, max: 1 },
            wr: { min: 1, max: EQUAL_PLAYER_COUNT },
            rb: { min: 1, max: EQUAL_PLAYER_COUNT },
            te: { min: 1, max: EQUAL_PLAYER_COUNT },
            dst: { min: 1, max: 1 },
        }
    };

    //
    //  add model contstraints
    //
    _.each(includes, iPlayer => {
        model.constraints[iPlayer.displayName] = { equal: 1 };
    });


    //
    //  add extra options
    //
    const modelOptions = {
        // tolerance: .01
    };

    model.options = modelOptions;

    return model;
}

function formatPlayersForOptimizeModel(draftables) {

    return _.map(draftables, p => {
        let _player = {};
        _player.displayName = p.displayName;
        _player.value = p.value;
        _player.salary = p.salary;
        _player.position = p.position;
        switch (p.position) {
            case POSITION.QB:
                _player.qb = 1;
                break;
            case POSITION.WR:
                _player.wr = 1;
                break;
            case POSITION.RB:
                _player.rb = 1;
                break;
            case POSITION.TE:
                _player.te = 1;
                break;
            case POSITION.DST:
                _player.dst = 1;
                break;
        }
        return _player;
    });
}

const totalSalary = (acc, curr) => {
    acc += curr.salary;
    return acc;
};

const addZeroOnePlayerConstraint = players => {
    _.each(players, p => {
        p[p.displayName] = 1;
        p.playerCount = 1;
    });
};

const addInts = (players, model) => {
    model.ints = [];
    _.each(players, p => { model.ints.push(p.displayName); });
};

const addBinaries = (players, model) => {
    model.binaries = [];
    _.each(players, p => { model.binaries.push(p.displayName); });
};

const DRAFT_KINGS_PLAYER_PROPS = ['displayName', 'salary', 'status', 'playerImageFull', 'teamAbbreviation', 'draftStatAttributes', 'position'];
const DRAFT_KING_STATUS = {
    OUT: 'O',
    ACTIVE: 'None',
    INJURED: 'Injured',
    QUESTIONABLE: 'Q'
};

const setupProjections = (projections, excludes) => {

    // console.log(projections)

    // let draftKingProjections = projections.draftables
    //     .map(playerProjection => _.pick(playerProjection, DRAFT_KINGS_PLAYER_PROPS));

    // console.log(draftKingProjections)

    // filter out bench players
    _.remove(projections, player => {
        return isNaN(player.value);
    });

    //
    //  filter out dups
    //
    projections = _.uniqWith(projections, (a, b) => a.displayName === b.displayName);

    //  ######################################
    //  start region remove players
    //  ######################################
    _.each(excludes, xPlayer => {
        _.remove(projections, player => player.displayName === xPlayer.displayName);
    });
    //  ######################################
    //  end region remove players
    //  ######################################

    // //
    // //  filter out injured
    // //
    // draftKingProjections = _.filter(draftKingProjections, p => p.status === DRAFT_KING_STATUS.ACTIVE);

    return projections;
};