function setGitHubProfile() {
    const apiLink ='https://api.github.com/users/makushenkoao';
    const openReposInfo = document.querySelector('.repositories')
    const reposContent = document.querySelector('.repositories-content');

    let condition = false;

    document.addEventListener("DOMContentLoaded",()=>{
        getUserInfo(apiLink).then(data => data);
        setTimeout(() => {
            document.querySelector('header').classList.remove('none')
            document.querySelector('section').classList.remove('none')
            document.querySelector('.container-loading').classList.add('none')
        }, 2500);
    });

    openReposInfo.addEventListener('click', () => {
        condition = !condition
        if (condition) {
            getReposInfo(`${apiLink}/repos`).then(data => data);
            document.querySelector('.about-profile-content').classList.add('none')
            document.querySelector('header').classList.add('none')
            document.querySelector('section').classList.add('none')
            document.querySelector('.container-loading').classList.remove('none')
            setTimeout(() => {
                document.querySelector('.container-loading').classList.add('none')
                document.querySelector('header').classList.remove('none')
                document.querySelector('section').classList.remove('none')
                document.querySelector('.about-profile-content').classList.remove('none')
            }, 2500);
        } else {
            document.querySelector('.about-profile-content').classList.add('none')
        }
    })

    function showUserInfo (data){
        const login = document.querySelector('.login')
        document.querySelector('.about-user-avatar img').src = `${data.avatar_url}`;
        document.querySelector('.name').innerHTML = data.name
        document.querySelector('.location').innerHTML = data.location
        document.querySelector('.bio').innerHTML = data.bio === null ? 'No bio' : data.bio;
        document.querySelector('.followers p').innerHTML = data.followers
        document.querySelector('.following p').innerHTML = data.following
        document.querySelector('.repositories p').innerHTML = data.public_repos
        login.innerHTML = `@${data.login}`
        login.addEventListener('click', () => {
            document.location = `${data.html_url}`
        })
    }

    function showReposInfo (data) {
        if (reposContent.querySelectorAll('div').length === data.length) return
        data.map(item => {
            const reposBlock = document.createElement('div')
            const reposName = document.createElement('h3');
            const branch = document.createElement('p');
            const commitAt = document.createElement('p')
            reposBlock.className = 'line'
            reposName.innerHTML = `name: ${item.name}`
            branch.innerHTML = `branch: ${item.default_branch}`
            commitAt.innerHTML = `commit at: ${new Date(item.pushed_at).toLocaleString()}`
            reposBlock.appendChild(reposName)
            reposBlock.appendChild(branch)
            reposBlock.appendChild(commitAt)
            reposContent.append(reposBlock)
        })
    }

    async function getUserInfo(api){
        return await fetch(api)
            .then(async user => await user.json())
            .then(result => showUserInfo(result))
            .catch(error => error);
    }

    async function getReposInfo(api) {
        return await fetch(api)
            .then(async repos => await repos.json())
            .then(repos => showReposInfo(repos))
            .catch(error => error);
    }

}

setGitHubProfile();