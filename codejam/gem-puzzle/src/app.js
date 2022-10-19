let sizeGame=4;

function createSiteStructure() {
    let div=document.createElement('div');
    document.body.append(div);
    div=document.createElement('div');
    document.body.append(div);
    div=document.createElement('div');
    document.body.append(div);
    document.body.lastChild.textContent='DDD';
    document.body.append(document.createElement('div'));
}
createSiteStructure();
